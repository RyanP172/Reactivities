using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity? Activity { get; set; } // This is what we want to receive as a praram
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity); //Not touching database after this code
                await _context.SaveChangesAsync();
                return Unit.Value; // mean nothing, just let API know we finish the task here
            }
        }
    }
}